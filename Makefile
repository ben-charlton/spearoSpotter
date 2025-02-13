.PHONY: build_and_publish_frontend build_and_publish_backend redeploy_all

PROJECT_ID=possible-tape-450509-e4
FRONTEND_IMAGE=gcr.io/$(PROJECT_ID)/spearo-frontend
BACKEND_IMAGE=gcr.io/$(PROJECT_ID)/spearo-backend

local_build:
	docker-compose --env-file .env.local up --build

build_and_publish_frontend:
	cd frontend && \
	gcloud builds submit --config cloudbuild.yml --substitutions=_VITE_API_BASE_URL="https://spearospotter.online"

build_and_publish_backend:
	cd backend && \
	docker buildx build --platform linux/amd64 -t $(BACKEND_IMAGE) --push .

redeploy_all:
	cd k8s && \
	kubectl delete --all deployments --namespace=default && \
	kubectl delete --all services --namespace=default && \
	kubectl apply -f issuer.yml && \
	kubectl apply -f ingress.yml && \
	kubectl apply -f configmap.yml && \
	kubectl apply -f deployment/redis.yml && \
	kubectl apply -f deployment/postgres.yml && \
	kubectl apply -f deployment/backend.yml && \
	kubectl apply -f deployment/frontend.yml

restart_frontend:
	kubectl rollout restart deployment frontend-deployment
