# Generated by Django 3.0.4 on 2020-03-28 10:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('trips', '0006_auto_20200327_1511'),
    ]

    operations = [
        migrations.AlterField(
            model_name='trip',
            name='trip_date',
            field=models.DateField(null=True),
        ),
    ]
