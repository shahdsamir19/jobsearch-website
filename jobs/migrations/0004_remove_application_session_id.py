# Generated by Django 5.0.6 on 2024-06-26 13:51

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('jobs', '0003_application_session_id'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='application',
            name='session_id',
        ),
    ]
