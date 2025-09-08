# PromptsHQ API Overview


## Core Endpoints
- `GET /files` - List available prompt/instruction files (returns `ResponseEntity<GenericAPIResponse<List<FileDto>>>`)
- `POST /files` - Submit a new file (returns `ResponseEntity<GenericAPIResponse<FileDto>>`)
- `PUT /files/{id}` - Edit an existing file (returns `ResponseEntity<GenericAPIResponse<FileDto>>`)
- `GET /files/{id}` - Retrieve a specific file (returns `ResponseEntity<GenericAPIResponse<FileDto>>`)
- `POST /ai/generate` - Generate prompt/diagram using LLM API (returns `ResponseEntity<GenericAPIResponse<GeneratedContentDto>>`)

## Authentication
- (To be defined)


## Error Handling

- All API responses use `GenericAPIResponse<T>` for consistency. See best-practices.md for implementation details and usage patterns.
- On error, set `body` to null and provide an `APIError` object. On success, set `error` to null and provide the response object in `body`.
- Use consistent status codes and error messages for frontend handling.


## DTOs
- All request/response objects are defined as DTOs in the `dto/` folder

## Documentation
- OpenAPI/Swagger to be provided
