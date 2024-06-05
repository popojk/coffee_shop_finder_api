FROM python:3.8-bookworm

# Set environment variables
ENV TZ "Asia/Taipei"
ENV PYTHONUNBUFFERED 1


# for locale
RUN apt-get update
RUN rm -rf /var/lib/apt/lists/*
RUN apt-get clean

# cd /root
WORKDIR /root

# Copy source code into image under production environment
COPY . .

# Install dependencies
COPY /requirements.txt ./
RUN pip install --upgrade pip
RUN pip install -r requirements.txt
RUN rm requirements.txt


CMD ["python", "main.py"]