Ön tarafta (FE) Angular8, arka tarafta (API) Django Rest Framework kullanılarak yazılmış "Gezi Ajandam" projesi.

Docker ile projeyi çalıştırmak:

Proje kök dizininde 'docker-compose up -d' komutu ile proje çalıştırılır.

Arayüz -> http://127.0.0.1:4200 
API -> http://127.0.0.1:8080

Api superuser'ı oluşturmak için 'docker exec -it backend bash' komutunun ardından 'python manage.py createsuperuser --email admin@example.com --username admin' komutları girilerek superuser oluşturulur.
