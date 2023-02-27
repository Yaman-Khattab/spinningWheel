from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class spinningWheelInfo(models.Model):
    probability = models.IntegerField()
    prize_name = models.CharField(max_length=40)
    spin_user = models.ForeignKey(User, null=True, on_delete=models.CASCADE)
    def __str__(self):
        return str(self.spin_user) +" "+  self.prize_name + " " + str(self.probability)