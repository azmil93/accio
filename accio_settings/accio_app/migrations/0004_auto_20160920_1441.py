# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2016-09-20 14:41
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accio_app', '0003_auto_20160913_1603'),
    ]

    operations = [
        migrations.AddField(
            model_name='track',
            name='preview',
            field=models.CharField(default='', max_length=200),
        ),
        migrations.AddField(
            model_name='track',
            name='spotify',
            field=models.CharField(default='', max_length=200),
        ),
    ]