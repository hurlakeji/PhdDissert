package com.dissert;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.vinzscam.reactnativefileviewer.RNFileViewerPackage;
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.firestore.RNFirebaseFirestorePackage; // <-- Add this line
import io.invertase.firebase.storage.RNFirebaseStoragePackage; // <-- Add this line
import io.invertase.firebase.auth.RNFirebaseAuthPackage; // <-- Add this line
import com.RNFetchBlob.RNFetchBlobPackage;
import com.rngrp.RNGRPPackage; // <------- add package
// import com.filepicker.FilePickerPackage; // import package
import com.oblador.vectoricons.VectorIconsPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.rnfs.RNFSPackage;
import com.reactnativedocumentpicker.ReactNativeDocumentPicker;
import com.dialogprogress.DialogProgressPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNFileViewerPackage(),
            new RNFirebasePackage(),
            new RNFetchBlobPackage(),
            new VectorIconsPackage(),
            new RNGestureHandlerPackage(),
            new RNFSPackage(),
            // new FilePickerPackage(), // Add package
            new RNGRPPackage(), // <---------- add package
            new ReactNativeDocumentPicker(),
            new DialogProgressPackage(),
            new RNFirebaseAuthPackage(), // <-- Add this line
            new RNFirebaseFirestorePackage(), // <-- Add this line
            new RNFirebaseStoragePackage() // <-- Add this line
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
