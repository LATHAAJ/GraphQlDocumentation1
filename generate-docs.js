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

## In this article

* About queries
* Schema overview
* Types
* Enums
* Queries

## About queries

Every GraphQL schema has a root type for both queries and mutations. The query type defines GraphQL operations that retrieve data from the server.

## Schema Overview

\`\`\`graphql
${schemaContent}
\`\`\`

`;

  // Generate Queries section first (like GitHub docs)
  if (queries.length > 0) {
    markdown += `## Queries\n\n`;
    queries.forEach(query => {
      markdown += `### ${query.name}\n\n`;
      
      // Add description based on query name
      let description = '';
      if (query.name === 'findAll') {
        description = 'Retrieve all players from all teams.';
      } else {
        description = `Execute the ${query.name} operation.`;
      }
      
      markdown += `${description}\n\n`;
      markdown += `**Type:** ${query.type}\n\n`;
      
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

  // Generate Types section
  if (types.length > 0) {
    markdown += `## Types\n\n`;
    types.forEach(type => {
      if (type.name === 'Query') return; // Skip Query type as it's handled above
      
      markdown += `### ${type.name}\n\n`;
      
      // Add description based on type name
      let description = '';
      if (type.name === 'Player') {
        description = 'Represents a cricket player with team affiliation and personal details.';
      } else {
        description = `The ${type.name} type definition.`;
      }
      
      markdown += `${description}\n\n`;
      
      if (type.fields.length > 0) {
        markdown += `#### Fields for \`${type.name}\`\n\n`;
        markdown += `| Name | Type | Description |\n`;
        markdown += `|------|------|-------------|\n`;
        
        type.fields.forEach(field => {
          let fieldDescription = '';
          if (field.name === 'id') {
            fieldDescription = 'Unique identifier for the player';
          } else if (field.name === 'name') {
            fieldDescription = 'Player\'s full name';
          } else if (field.name === 'team') {
            fieldDescription = 'Team the player belongs to';
          } else if (field.name === 'jerseyNumber') {
            fieldDescription = 'Player\'s jersey number';
          } else {
            fieldDescription = `${field.name} field`;
          }
          
          markdown += `| \`${field.name}\` | \`${field.type}\` | ${fieldDescription} |\n`;
        });
        markdown += `\n`;
      }
    });
  }

  // Generate Enums section
  if (enums.length > 0) {
    markdown += `## Enums\n\n`;
    enums.forEach(enumType => {
      markdown += `### ${enumType.name}\n\n`;
      
      // Add description based on enum name
      let description = '';
      if (enumType.name === 'Team') {
        description = 'Cricket teams participating in IPL (Indian Premier League).';
      } else {
        description = `The ${enumType.name} enum values.`;
      }
      
      markdown += `${description}\n\n`;
      markdown += `#### Values for \`${enumType.name}\`\n\n`;
      markdown += `| Value | Description |\n`;
      markdown += `|-------|-------------|\n`;
      
      enumType.values.forEach(value => {
        let valueDescription = '';
        if (value === 'CSK') {
          valueDescription = 'Chennai Super Kings';
        } else if (value === 'MI') {
          valueDescription = 'Mumbai Indians';
        } else if (value === 'RCB') {
          valueDescription = 'Royal Challengers Bangalore';
        } else if (value === 'DC') {
          valueDescription = 'Delhi Capitals';
        } else if (value === 'GT') {
          valueDescription = 'Gujarat Titans';
        } else {
          valueDescription = `${value} team`;
        }
        
        markdown += `| \`${value}\` | ${valueDescription} |\n`;
      });
      markdown += `\n`;
    });
  }

  markdown += `## Help and support

### How to Update Documentation

To update this documentation when you make changes to your GraphQL schema:

\`\`\`bash
node generate-docs.js
\`\`\`

This will automatically parse your schema and regenerate this documentation.

### Schema File Location

The documentation is generated from: \`src/main/resources/graphql/schema.graphqls\`

### Example Usage

\`\`\`graphql
# Get all players
query GetAllPlayers {
  findAll {
    id
    name
    team
  }
}

# Get players from specific team
query GetPlayersByTeam {
  findAll {
    id
    name
    team
  }
}
\`\`\`
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
