# Build the Go program
build:
	@echo Building the Go program...
	@if not exist build mkdir build
	go build -o build/fp_be.exe cmd/main.go cmd/routes.go
	@echo Build complete! Binary located at build/fp_be.exe

# Run the Go program
run: build
	@echo Running the Go program...
	./build/fp_be.exe

# Clean the build directory
clean:
	@echo Cleaning up...
	@if exist build rmdir /S /Q build
	@echo Clean complete.

# Run tests
test:
	@echo Running tests...
	go test ./...

# Phony targets
.PHONY: build run clean test