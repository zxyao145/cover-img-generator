echo "build ..."
docker build -t cover-img-generator:latest .
# nerdctl build --namespace k8s.io -t cover-img-generator:latest .
echo "build end"