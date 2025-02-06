from django.db import models

# Create your models here.

#creating model for our database
class Todo(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    status = models.BooleanField(default=False)
    
    def __str__(self):
        return self.title
    