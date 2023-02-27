from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth.models import User
from .models import spinningWheelInfo
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from .forms import spinningWheelInfoForm
from django.core import serializers
from django.db.models.query import QuerySet
def loginPage(request):
    Error = False
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        try:
            user = User.objects.get(username=username)
        except:
            messages.error(request, 'Username or Password does not exists')
            Error = True
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request,user)
            return redirect('home')
        else:
            if (Error == False):
                messages.error(request, 'Username or Password does not exists')
    context = {}
    if request.user.is_authenticated:
        return render(request,'base/spinning_wheel.html')
    else:
        return render(request,'base/home.html')

@login_required(login_url='/login')
def home(request):
    shope_name = request.user.first_name
    prize_name = []
    probability = []
    info_id = []
    wheelInfo = spinningWheelInfo.objects.all().values()
    for info in wheelInfo:
        if info['spin_user_id'] == request.user.id:
            prize_name.append(info['prize_name'])
            probability.append(info['probability'])
            info_id.append(info['id'])
    form = spinningWheelInfoForm()
    if  request.method == 'POST':
        if 'addInfo' in request.POST:
            form = spinningWheelInfoForm(request.POST)
            if form.is_valid():
                form.save()
                wheelInfo = spinningWheelInfo.objects.all().values()
                spinInfo = spinningWheelInfo.objects.get(id = (wheelInfo[len(wheelInfo) - 1]['id']))
                spinInfo.spin_user = request.user
                spinInfo.save()
            return redirect('home')
        elif 'updateInfo' in request.POST:
            prize_name_form = request.POST.getlist('choice')
            probability_form = request.POST.getlist('weight')
            for i in range(len(prize_name_form)):
                if prize_name[i] != prize_name_form[i] or probability[i] != probability_form[i]:
                    Data = spinningWheelInfo.objects.get(id = info_id[i])
                    Data.prize_name = prize_name_form[i]
                    Data.probability = probability_form[i]
                    Data.save()
            return redirect('home')
        else:
            ids = []
            for x in request.POST:
                ids.append(x)
            print(ids)
            DeleteInfo = spinningWheelInfo.objects.get(id = ids[3])
            DeleteInfo.delete()
            wheelInfo = spinningWheelInfo.objects.all().values()
            return redirect('home')
    wheelInfo = spinningWheelInfo.objects.filter(spin_user_id = request.user.id)
    context = {'form':form, 'wheelInfo':wheelInfo, 'prize_name':prize_name, 'probability':probability, 'shope_name':shope_name}
    return render(request,'base/spinning_wheel.html', context)


def logoutUser(request):
    logout(request)
    return redirect('/login')
