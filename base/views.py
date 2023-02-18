from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
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
    return render(request, 'base/home.html', context)

@login_required(login_url='/login')
def home(request):
    return render(request,'base/spinning_wheel.html')

def logoutUser(request):
    logout(request)
    return redirect('login')
