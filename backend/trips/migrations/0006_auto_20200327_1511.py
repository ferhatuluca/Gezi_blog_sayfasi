# Generated by Django 3.0.4 on 2020-03-27 12:11

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('trips', '0005_auto_20200326_2118'),
    ]

    operations = [
        migrations.RenameField(
            model_name='trip',
            old_name='author',
            new_name='owner',
        ),
    ]
