package problems.Arrays.PrintArrayInReverse;

import java.util.Scanner;

public class Main {

    public static void reverse(int n, int[] arr) {
        for (int i = n - 1; i >= 0; i--) {
            System.out.print(arr[i]);
            System.out.print(" ");
        }
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();

        int[] arr = new int[n];

        for (int i = 0; i < n; i++) {
            arr[i] = sc.nextInt();
        }

        reverse(n, arr);

        sc.close();
    }
}