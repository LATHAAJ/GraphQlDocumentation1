# Dynamic GraphQL Documentation Generator

## 🚀 What We Built

A **fully dynamic** GraphQL documentation generator that automatically updates when you change your schema.

## 📁 Files Created

1. **`generate-docs.js`** - Enhanced dynamic script that:
   - Parses GraphQL schema automatically
   - Extracts types, enums, queries, and mutations
   - Generates professional markdown documentation
   - Shows generation timestamp
   - Provides update instructions

2. **`package.json`** - Node.js project configuration with:
   - Documentation generation scripts
   - Watch mode for automatic updates
   - Development dependencies

3. **`docs/graphql/README.md`** - Auto-generated documentation

## 🔧 Commands Used

### Basic Commands:
```bash
# Generate documentation
node generate-docs.js

# Install dependencies (optional)
npm install

# Watch mode - auto-regenerate when schema changes
npm run watch-schema
```

### Git Commands:
```bash
# Add files
git add docs/graphql/README.md generate-docs.js package.json

# Commit
git commit -m "Add dynamic GraphQL documentation generator"

# Push
git push origin documentationBranch
```

## ✨ Dynamic Features

### **Automatic Schema Parsing:**
- Reads `src/main/resources/graphql/schema.graphqls`
- Extracts all types, enums, queries automatically
- No manual configuration needed

### **Smart Documentation Generation:**
- **Types Section**: Lists all types with their fields
- **Enums Section**: Shows all enum values
- **Queries Section**: Documents all queries with examples
- **Auto-generated Examples**: Creates GraphQL query examples
- **Timestamp**: Shows when documentation was last generated

### **Easy Updates:**
- Run `node generate-docs.js` after any schema change
- Documentation automatically reflects new types, fields, queries
- No manual editing required

## 🎯 How It Works

1. **Schema Analysis**: Script reads your GraphQL schema file
2. **Pattern Matching**: Uses regex to extract types, enums, queries
3. **Dynamic Generation**: Creates markdown based on actual schema content
4. **Professional Formatting**: Generates GitHub-ready documentation

## 🔄 Workflow

1. **Make schema changes** in `src/main/resources/graphql/schema.graphqls`
2. **Run generator**: `node generate-docs.js`
3. **Documentation updates** automatically
4. **Commit and push** to GitHub
5. **Team sees updated docs** immediately

## 📊 Example Output

The generated documentation includes:
- Schema overview with syntax highlighting
- Dynamic type listings
- Auto-generated query examples
- Update instructions
- Generation timestamp

## 🎉 Benefits

- **Zero Maintenance**: Documentation stays in sync with schema
- **Team Friendly**: Easy to read and understand
- **GitHub Ready**: Renders beautifully on GitHub
- **Professional**: Suitable for API documentation
- **Scalable**: Works with any GraphQL schema size

This approach ensures your documentation is always up-to-date and requires minimal effort to maintain!
