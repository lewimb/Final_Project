# Build the Go program
build:
	@echo "Building the Go program..."
	@mkdir -p build
	go build -o build/fp_be cmd/main.go cmd/routes.go
	@echo "Build complete! Binary located at build/fp_be"

# Run the Go program
run: build
	@echo "Running the Go program..."
	./build/fp_be

# Clean the build directory
clean:
	@echo "Cleaning up..."
	@rm -rf build
	@echo "Clean complete."

# Run tests
test:
	@echo "Running tests..."
	go test ./...

# Phony targets
.PHONY: build run clean test
