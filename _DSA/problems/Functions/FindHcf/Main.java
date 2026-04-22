package problems.Functions.FindHcf;

import java.util.Scanner;

public class Main {
    public static int func(int a, int b, int small) {
        int hcf = 1;
        for (int i = 1; i <= small; i++) {
            if (a % i == 0 && b % i == 0) {
                hcf = Math.max(hcf, i);
            }
        }
        return hcf;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        int a = sc.nextInt();
        int b = sc.nextInt();

        int small = Math.min(a, b);

        System.out.print(func(a, b, small));

        sc.close();
    }
}
