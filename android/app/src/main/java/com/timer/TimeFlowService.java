package com.timer;

import android.app.Service;
import android.content.Intent;
import android.os.IBinder;

public class TimeFlowService extends Service {
    public TimeFlowService() {
    }

    @Override
    public IBinder onBind(Intent intent) {
        // TODO: Return the communication channel to the service.
        throw new UnsupportedOperationException("Not yet implemented");
    }
}