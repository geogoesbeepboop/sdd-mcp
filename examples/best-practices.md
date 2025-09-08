# Coding Best Practices for PromptsHQ

## General
- Use comments alongside your code implementations for maintainability

## Backend (Spring Boot)
- Use layered architecture: @Controller, @Service, @Repository, @Entity, config
- Use MySQL/SQL for the database layer, managed by Hibernate ORM (let Hibernate auto-create/update tables from @Entity classes)
- Configure DB connection in `application.properties`
- All controller methods should return `ResponseEntity<GenericAPIResponse<T>>` for consistent API responses. When implementing a new controller method, always:
	- Wrap your response in a `GenericAPIResponse<T>` object, setting status, message, body, and error as appropriate.
	- Use `ResponseEntity.status(relevantStatus).body(new GenericAPIResponse<>(...))` for all returns.
	- On error, set `body` to null and provide an `APIError` object.
	- On success, set `error` to null and provide the response object in `body`.
	- Use DTOs for all request and response payloads.
	- Example usage:
		```java
		return ResponseEntity.status(HttpStatus.OK)
				.body(new GenericAPIResponse<>(200, "Success", fileDto, null));
		// On error:
		return ResponseEntity.status(HttpStatus.BAD_REQUEST)
				.body(new GenericAPIResponse<>(400, "Validation failed", null, new APIError(400, "Details here")));
		```
- Store all DTOs (common, request, response) in a `dto/` folder
- Place outlier private functions in appropriate `utils` files (e.g., JiraUtils, CoreUtils, HttpUtils, etc)
- Handle exceptions with global exception handlers

## Frontend (React, Vite, TypeScript, MUI)
- Use functional components and hooks
- Type all props and state with TypeScript
- Use MUI for consistent UI components
- Organize code by feature/module
- Write tests for components and hooks

## AI Integration
- Abstract LLM API calls behind service interfaces
- Handle API errors gracefully
- Log and monitor AI interactions

## Collaboration
- Document architecturalm, api and design decisions in /docs