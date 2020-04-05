FROM python:3

# Set environment variables
ENV PYTHONUNBUFFERED 1

COPY requirements.txt /

# Install dependencies.
RUN pip install --upgrade pip
RUN pip install -r /requirements.txt

# Set work directory.
RUN mkdir /drf
WORKDIR /drf

# Copy project drf.
COPY . /drf/

EXPOSE 8080