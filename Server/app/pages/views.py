from django.shortcuts import render
from django.views import generic
# Create your views here.


class FrontendTenderView(generic.View):
    def get(self, request, *args, **kwargs):
        return render(request, "pages/front-end-render.html", {})



def index(request):
    return render(request, 'index.html')

def navbar(request):
    return render(request, 'navbar.html')