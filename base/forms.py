from django.forms import ModelForm
from .models import spinningWheelInfo

class spinningWheelInfoForm(ModelForm):
    class Meta:
        model = spinningWheelInfo
        fields =  (
            'probability',
            'prize_name')
        labels = {
            "probability": "",
            "prize_name": ""
        }