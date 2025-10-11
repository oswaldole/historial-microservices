package com.historial.report.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.Contact;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI reportServiceOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Report Service API")
                        .description("Reporting and Analytics Service for Historial Application")
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("Historial Team")
                                .email("support@historial.com")
                        )
                );
    }
}
