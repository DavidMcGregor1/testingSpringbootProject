package com.example.JustTryingToCompile;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

import static org.junit.Assert.*;

public class FirstTest {
    private WebDriver driver;

    @Before
    public void setUp() {
        // Fix the typo in the property name

    }

    @Test
    public void testSpringBootApp() {
        System.setProperty("webdriver.chrome.driver", "C:\\files\\code\\ChromeDriver\\chromedriver-win64\\chromedriver.exe");
//        driver = new ChromeDriver();
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--remote-allow-origins=*");
        WebDriver driver = new ChromeDriver(options);
        driver.get("http://localhost:8082/displayNewAcronyms");


    }

    @After
    public void tearDown() {
//        if (driver != null) {
//            driver.quit();
//        }
    }
}
