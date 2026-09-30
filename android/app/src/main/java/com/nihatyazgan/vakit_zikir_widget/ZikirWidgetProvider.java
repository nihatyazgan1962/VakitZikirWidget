package com.nihatyazgan.vakit_zikir_widget;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.widget.RemoteViews;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;

public class ZikirWidgetProvider extends AppWidgetProvider {

    public static final String ACTION_COUNT = "com.nihatyazgan.vakit_zikir_widget.ACTION_COUNT";
    public static final String ACTION_RESET = "com.nihatyazgan.vakit_zikir_widget.ACTION_RESET";
    private static final String PREFS_NAME = "CapacitorStorage";
    private static final String KEY_COUNTER = "zikir_counter_val";

    @Override
    public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {
        for (int appWidgetId : appWidgetIds) {
            updateAppWidget(context, appWidgetManager, appWidgetId);
        }
    }

    @Override
    public void onReceive(Context context, Intent intent) {
        super.onReceive(context, intent);

        SharedPreferences prefs = context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);

        if (ACTION_COUNT.equals(intent.getAction())) {
            int current = getCounterValue(context);
            current++;
            saveCounterValue(context, current);
            updateAllWidgets(context);
        } else if (ACTION_RESET.equals(intent.getAction())) {
            saveCounterValue(context, 0);
            updateAllWidgets(context);
        }
    }

    private static int getCounterValue(Context context) {
        SharedPreferences prefs = context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
        String val = prefs.getString(KEY_COUNTER, "0");
        try {
            return Integer.parseInt(val);
        } catch (Exception e) {
            return prefs.getInt(KEY_COUNTER, 0);
        }
    }

    private static void saveCounterValue(Context context, int value) {
        SharedPreferences prefs = context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
        prefs.edit().putString(KEY_COUNTER, String.valueOf(value)).apply();
    }

    private static void updateAllWidgets(Context context) {
        AppWidgetManager manager = AppWidgetManager.getInstance(context);
        ComponentName componentName = new ComponentName(context, ZikirWidgetProvider.class);
        int[] ids = manager.getAppWidgetIds(componentName);
        for (int id : ids) {
            updateAppWidget(context, manager, id);
        }
    }

    public static void updateAppWidget(Context context, AppWidgetManager appWidgetManager, int appWidgetId) {
        RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.widget_zikir_vakit);

        int counter = getCounterValue(context);
        views.setTextViewText(R.id.widget_zikir_counter, String.format(Locale.getDefault(), "%03d", counter));

        // +1 Zikret Butonu Aksiyonu
        Intent countIntent = new Intent(context, ZikirWidgetProvider.class);
        countIntent.setAction(ACTION_COUNT);
        PendingIntent countPending = PendingIntent.getBroadcast(context, 101, countIntent, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
        views.setOnClickPendingIntent(R.id.widget_btn_count, countPending);

        // Sıfırla Butonu Aksiyonu
        Intent resetIntent = new Intent(context, ZikirWidgetProvider.class);
        resetIntent.setAction(ACTION_RESET);
        PendingIntent resetPending = PendingIntent.getBroadcast(context, 102, resetIntent, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
        views.setOnClickPendingIntent(R.id.widget_btn_reset, resetPending);

        // Uygulamayı Açma Aksiyonu (Kök layout'a tıklanınca)
        Intent openAppIntent = new Intent(context, MainActivity.class);
        PendingIntent openAppPending = PendingIntent.getActivity(context, 100, openAppIntent, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
        views.setOnClickPendingIntent(R.id.widget_root, openAppPending);

        appWidgetManager.updateAppWidget(appWidgetId, views);
    }
}
