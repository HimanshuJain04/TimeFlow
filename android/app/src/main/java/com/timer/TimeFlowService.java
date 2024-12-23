package com.timer;

import android.appwidget.AppWidgetManager;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Handler;
import android.os.IBinder;
import android.os.PowerManager;
import android.provider.Settings;
import android.widget.RemoteViews;
import androidx.annotation.Nullable;
import java.text.DecimalFormat;
import java.util.Calendar;
import android.app.Service;



public class TimeFlowService extends Service {

    private static final DecimalFormat decimalFormat = new DecimalFormat("0.00");
    private final Handler handler = new Handler();
    private Runnable updateRunnable;


    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {

        // Check if the app is excluded from battery optimization
        PowerManager powerManager = (PowerManager) getSystemService(Context.POWER_SERVICE);
        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.M) {
            if (!powerManager.isIgnoringBatteryOptimizations(getPackageName())) {
                Intent i = new Intent(Settings.ACTION_REQUEST_IGNORE_BATTERY_OPTIMIZATIONS);
                i.setData(Uri.parse("package:" + getPackageName()));
                startActivity(i);  // Opens system prompt to ignore battery optimization
            }
        }

        // Start updating widget only if it's visible
        startUpdatingWidget();
        return START_STICKY;
    }


    private void startUpdatingWidget() {
        updateRunnable = new Runnable() {
            @Override
            public void run() {
                updateWidget();
                handler.postDelayed(this, 1000); // Update every second
            }
        };
        handler.post(updateRunnable);
    }


    private void updateWidget() {
        // Fetch current time
        Calendar now = Calendar.getInstance();

        // Calculate year progress
        int dayOfYear = now.get(Calendar.DAY_OF_YEAR);
        int daysInYear = now.getActualMaximum(Calendar.DAY_OF_YEAR);
        double yearPercentage = (dayOfYear / (double) daysInYear) * 100;
        int remainingDaysYear = daysInYear - dayOfYear;

        // Calculate month progress
        int dayOfMonth = now.get(Calendar.DAY_OF_MONTH);
        int daysInMonth = now.getActualMaximum(Calendar.DAY_OF_MONTH);
        double monthPercentage = (dayOfMonth / (double) daysInMonth) * 100;
        int remainingDaysMonth = daysInMonth - dayOfMonth;

        // Calculate day progress
        int hourOfDay = now.get(Calendar.HOUR_OF_DAY);
        int minute = now.get(Calendar.MINUTE);
        int second = now.get(Calendar.SECOND);
        int totalSecondsInDay = 24 * 60 * 60;
        int elapsedSeconds = (hourOfDay * 3600) + (minute * 60) + second;
        double dayPercentage = (elapsedSeconds / (double) totalSecondsInDay) * 100;
        int remainingHoursDay = 24 - hourOfDay;

        // Update the widget views
        Context context = getApplicationContext();
        RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.timeflow);
        views.setTextViewText(R.id.year_value, decimalFormat.format(yearPercentage) + "%");
        views.setTextViewText(R.id.month_value, decimalFormat.format(monthPercentage) + "%");
        views.setTextViewText(R.id.day_value, decimalFormat.format(dayPercentage) + "%");

        views.setProgressBar(R.id.year_progress, 100, (int) Math.round(yearPercentage), false);
        views.setProgressBar(R.id.month_progress, 100, (int) Math.round(monthPercentage), false);
        views.setProgressBar(R.id.day_progress, 100, (int) Math.round(dayPercentage), false);

        views.setTextViewText(R.id.year_remaining, "Remaining: " + remainingDaysYear + " days");
        views.setTextViewText(R.id.month_remaining, "Remaining: " + remainingDaysMonth + " days");
        views.setTextViewText(R.id.day_remaining, "Remaining: " + remainingHoursDay + " hours");

        // Push update to the widget
        AppWidgetManager appWidgetManager = AppWidgetManager.getInstance(context);
        ComponentName widget = new ComponentName(context, timeflow.class);
        appWidgetManager.updateAppWidget(widget, views);
    }



    public void onDestroy() {
        handler.removeCallbacks(updateRunnable);
        super.onDestroy();
    }

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }
}