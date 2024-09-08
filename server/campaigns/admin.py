from django.contrib import admin
from .models import Campaign, Subscriber

class CampaignModelAdmin(admin.ModelAdmin):
    list_display = ("title", "created_at", "updated_at") #Dispaly with admin
    search_fields = ("title", "description") #Match search with these fields
    list_per_page = 10 #Pagination

class SubscriberModelAdmin(admin.ModelAdmin):
    list_display = ("email", "campaign", "created_at")
    search_fields = ("email", "campaign__title", "created_at") #Handles with foreign key
    list_per_page = 10

admin.site.register(Campaign, CampaignModelAdmin)
admin.site.register(Subscriber, SubscriberModelAdmin)