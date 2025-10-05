const fs = require('fs');
const path = require('path');

// Function to parse GraphQL schema and extract information
function parseGraphQLSchema(schemaContent) {
  const types = [];
  const enums = [];
  const queries = [];
  const mutations = [];
  
  // Extract types
  const typeMatches = schemaContent.match(/type\s+(\w+)\s*\{([^}]+)\}/g);
  if (typeMatches) {
    typeMatches.forEach(match => {
      const typeName = match.match(/type\s+(\w+)/)[1];
      const fields = match.match(/\{([^}]+)\}/)[1];
      const fieldList = fields.split('\n')
        .map(line => line.trim())
        .filter(line => line && !line.includes('{') && !line.includes('}'))
        .map(line => {
          const parts = line.split(':');
          return {
            name: parts[0].trim(),
            type: parts[1] ? parts[1].trim().replace(',', '') : '',
            description: ''
          };
        });
      
      types.push({
        name: typeName,
        fields: fieldList,
        description: ''
      });
    });
  }
  
  // Extract enums
  const enumMatches = schemaContent.match(/enum\s+(\w+)\s*\{([^}]+)\}/g);
  if (enumMatches) {
    enumMatches.forEach(match => {
      const enumName = match.match(/enum\s+(\w+)/)[1];
      const values = match.match(/\{([^}]+)\}/)[1];
      const valueList = values.split('\n')
        .map(line => line.trim())
        .filter(line => line && !line.includes('{') && !line.includes('}'))
        .map(line => line.replace(',', '').trim());
      
      enums.push({
        name: enumName,
        values: valueList,
        description: ''
      });
    });
  }
  
  // Extract queries
  const queryMatches = schemaContent.match(/type\s+Query\s*\{([^}]+)\}/g);
  if (queryMatches) {
    const queryContent = queryMatches[0].match(/\{([^}]+)\}/)[1];
    const queryList = queryContent.split('\n')
      .map(line => line.trim())
      .filter(line => line && !line.includes('{') && !line.includes('}'))
      .map(line => {
        const parts = line.split(':');
        return {
          name: parts[0].trim(),
          type: parts[1] ? parts[1].trim().replace(',', '') : '',
          description: ''
        };
      });
    
    queries.push(...queryList);
  }
  
  return { types, enums, queries, mutations };
}

// Function to generate markdown documentation
function generateMarkdown(schemaData, schemaContent) {
  const { types, enums, queries } = schemaData;
  
  let markdown = `# GraphQL API Documentation

> **Auto-generated on:** ${new Date().toLocaleString()}
> 
> This documentation is automatically generated from your GraphQL schema. 
> Any changes to the schema will be reflected here when you run \`node generate-docs.js\`

## Schema Overview

\`\`\`graphql
${schemaContent}
\`\`\`

`;

  // Generate Types section
  if (types.length > 0) {
    markdown += `## Types\n\n`;
    types.forEach(type => {
      markdown += `### ${type.name}\n`;
      if (type.description) {
        markdown += `${type.description}\n\n`;
      }
      if (type.fields.length > 0) {
        markdown += `**Fields:**\n`;
        type.fields.forEach(field => {
          markdown += `- **${field.name}**: ${field.type}`;
          if (field.description) {
            markdown += ` - ${field.description}`;
          }
          markdown += `\n`;
        });
        markdown += `\n`;
      }
    });
  }

  // Generate Enums section
  if (enums.length > 0) {
    markdown += `## Enums\n\n`;
    enums.forEach(enumType => {
      markdown += `### ${enumType.name}\n`;
      if (enumType.description) {
        markdown += `${enumType.description}\n\n`;
      }
      markdown += `**Values:**\n`;
      enumType.values.forEach(value => {
        markdown += `- \`${value}\`\n`;
      });
      markdown += `\n`;
    });
  }

  // Generate Queries section
  if (queries.length > 0) {
    markdown += `## Queries\n\n`;
    queries.forEach(query => {
      markdown += `### ${query.name}\n`;
      if (query.description) {
        markdown += `${query.description}\n\n`;
      }
      markdown += `**Type**: \`${query.type}\`\n\n`;
      
      // Generate example query
      if (query.name === 'findAll' && types.find(t => t.name === 'Player')) {
        markdown += `**Example Query:**\n`;
        markdown += `\`\`\`graphql\n`;
        markdown += `query {\n`;
        markdown += `  ${query.name} {\n`;
        const playerType = types.find(t => t.name === 'Player');
        if (playerType) {
          playerType.fields.forEach(field => {
            markdown += `    ${field.name}\n`;
          });
        }
        markdown += `  }\n`;
        markdown += `}\n`;
        markdown += `\`\`\`\n\n`;
      }
    });
  }

  markdown += `## How to Update Documentation

To update this documentation when you make changes to your GraphQL schema:

\`\`\`bash
node generate-docs.js
\`\`\`

This will automatically parse your schema and regenerate this documentation.

## Schema File Location

The documentation is generated from: \`src/main/resources/graphql/schema.graphqls\`
`;

  return markdown;
}

// Main execution
try {
  // Read the schema file
  const schemaPath = 'src/main/resources/graphql/schema.graphqls';
  const schemaContent = fs.readFileSync(schemaPath, 'utf8');
  
  // Parse the schema
  const schemaData = parseGraphQLSchema(schemaContent);
  
  // Create docs directory
  const docsDir = 'docs/graphql';
  if (!fs.existsSync(docsDir)) {
    fs.mkdirSync(docsDir, { recursive: true });
  }
  
  // Generate markdown documentation
  const markdown = generateMarkdown(schemaData, schemaContent);
  
  // Write the documentation
  fs.writeFileSync(path.join(docsDir, 'README.md'), markdown);
  
  console.log('✅ Dynamic documentation generated successfully!');
  console.log('📁 Location: docs/graphql/README.md');
  console.log('🔄 To update: node generate-docs.js');
  console.log(`📊 Found: ${schemaData.types.length} types, ${schemaData.enums.length} enums, ${schemaData.queries.length} queries`);
  
} catch (error) {
  console.error('❌ Error generating documentation:', error.message);
  process.exit(1);
}
