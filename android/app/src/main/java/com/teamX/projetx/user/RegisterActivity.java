package com.teamX.projetx.user;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.teamX.projetx.R;
import com.teamX.projetx.database.DataBase;
import com.teamX.projetx.database.UserService;

import retrofit2.Call;
import retrofit2.Retrofit;

public class RegisterActivity extends AppCompatActivity {

    private Button register;
    private EditText nickname;
    private EditText mail;
    private EditText password;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);

        // set up the interface
        this.register   = (Button) findViewById(R.id.buttonRegister);
        this.nickname   = (EditText) findViewById(R.id.editTextNickname);
        this.mail       = (EditText) findViewById(R.id.editTextMail);
        this.password   = (EditText) findViewById(R.id.editTextPassword);


        // On register click
        this.register.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Retrofit restService = DataBase.getRetrofitService();
                UserService service = restService.create(UserService.class);
                Call<User> call = service.userRegister(nickname.getText().toString(), mail.getText().toString(), password.getText().toString());

                call.enqueue(new retrofit2.Callback<User>() {
                    @Override
                    public void onResponse(Call<User> call, retrofit2.Response<User> response) {
                        try {
                            System.out.println("response = " + response.body());
                            startActivity(new Intent(RegisterActivity.this, LoginActivity.class));

                        } catch (Exception e) {
                            System.out.println("error " + response);
                            e.printStackTrace();
                        }
                    }

                    @Override
                    public void onFailure(Call<User> call, Throwable t) {
                        t.printStackTrace();
                        Toast.makeText(getApplicationContext(), "Connection failed", Toast.LENGTH_SHORT).show();
                    }
                });
            }
        });
    }
}
