package problems.Functions.PrintFactors;

import java.util.Scanner;

public class Main {
    public static void print(int n) {
        for (int i = 1; i <= n; i++) {
            if (n % i == 0) {
                System.out.print(i);
                System.out.print(" ");
            }
        }
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        print(n);

        sc.close();

    }
}