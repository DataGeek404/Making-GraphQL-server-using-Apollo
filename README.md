```markdown
# GraphQL API Server - Combined Data Access

A GraphQL server implementation using Apollo Server that provides access to book, school, and country data through both combined and individual queries.

## Features

- 📚 Book data with title and author information
- 🏫 School data with name and principal details
- 🌍 Country data with population and area statistics
- 🔄 Combined query to fetch all data in a single request
- ⚡ Apollo Server with standalone configuration
- 📡 GraphQL type definitions and resolvers

## Installation

1. Clone the repository
```bash
git clone <repository-url>
```

2. Install dependencies
```bash
npm install @apollo/server graphql
```

3. Start the server
```bash
node server.js
```

The server will run on `http://localhost:3000`

## API Usage

### Combined Data Query
Fetch all data in a single request:
```graphql
query GetAllData {
  getAllData {
    books {
      title
      author
    }
    schools {
      name
      principal
    }
    countries {
      name
      population
      area
    }
  }
}
```

### Individual Queries
Fetch specific datasets separately:
```graphql
query GetBooks {
  books {
    title
    author
  }
}

query GetSchools {
  schools {
    name
    principal
  }
}

query GetCountries {
  countries {
    name
    population
    area
  }
}
```

## Example Response
```json
{
  "data": {
    "getAllData": {
      "books": [
        {
          "title": "The Awakening",
          "author": "Kate Chopin"
        },
        {
          "title": "City of Glass",
          "author": "Paul Auster"
        }
      ],
      "schools": [
        {
          "name": "Gatero Girls High School",
          "principal": "James Muchiri"
        }
      ],
      "countries": [
        {
          "name": "Kenya",
          "population": 50000000,
          "area": 580367
        }
      ]
    }
  }
}
```

## Technologies Used
- Apollo Server 4.x
- GraphQL
- Node.js 18+
- TypeScript (configuration available)

## License
MIT License - see [LICENSE](LICENSE) for details

---

**Note**: You can test the API using tools like:
- [Apollo Studio Explorer](https://studio.apollographql.com/sandbox/explorer)
- [curl](https://curl.se/)
- [Postman](https://www.postman.com/)
- Any GraphQL client application
```

This README includes:
1. Clear installation instructions
2. Query examples for both combined and individual data
3. Sample response structure
4. Technology stack information
5. Testing suggestions
6. License information

