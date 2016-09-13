# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2016-09-13 16:03
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('accio_app', '0002_remove_track_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='track',
            name='user',
            field=models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='track',
            name='imageURL',
            field=models.CharField(default='', max_length=200),
        ),
    ]