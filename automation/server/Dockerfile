FROM python:3.8-bookworm

# Set environment variables
ENV TZ "Asia/Taipei"
ENV PYTHONUNBUFFERED 1

# cd /root
WORKDIR /root

# Copy the project code into the container
COPY api ./api

# cd to project entry directory
WORKDIR /root/api

# Install dependenciess
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

CMD ["python", "main.py", "--dev"]