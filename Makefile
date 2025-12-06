.PHONY: help build push build-push login

IMAGE_NAME := ghcr.io/snitrxm/agencia-douro
IMAGE_TAG := latest
PLATFORM := linux/amd64

help:
	@echo "Available commands:"
	@echo "  make build       - Build Docker image for Linux"
	@echo "  make push        - Push Docker image to registry"
	@echo "  make build-push  - Build and push Docker image"
	@echo "  make login       - Login to GitHub Container Registry"

login:
	@echo "Logging in to GitHub Container Registry..."
	docker login ghcr.io

build:
	@echo "Building Docker image for $(PLATFORM)..."
	docker buildx build --platform $(PLATFORM) -t $(IMAGE_NAME):$(IMAGE_TAG) .

push:
	@echo "Pushing Docker image to registry..."
	docker push $(IMAGE_NAME):$(IMAGE_TAG)

build-push:
	@echo "Building and pushing Docker image for $(PLATFORM)..."
	docker buildx build --platform $(PLATFORM) -t $(IMAGE_NAME):$(IMAGE_TAG) --push .
