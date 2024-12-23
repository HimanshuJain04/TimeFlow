package com.timer;

import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.Context;
import android.content.Intent;


public class timeflow extends AppWidgetProvider {

    @Override
    public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {
        super.onUpdate(context, appWidgetManager, appWidgetIds);

        // Start the service to handle updates
        Intent intent = new Intent(context, TimeFlowService.class);
        context.startService(intent);
    }


    @Override
    public void onDisabled(Context context) {
        super.onDisabled(context);

        // Stop the service when the widget is no longer in use
        Intent intent = new Intent(context, TimeFlowService.class);
        context.stopService(intent);
    }
}