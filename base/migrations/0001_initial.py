# Generated by Django 4.1.4 on 2023-02-22 18:11

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='spinningWheelInfo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('prize_name', models.TextField()),
                ('probability', models.IntegerField()),
            ],
        ),
    ]
