package problems.Arrays.SumOfArray;

import java.util.Scanner;

public class Main {
    public static long sum(int n, int[] arr) {
        long ans = 0;
        for (int i = 0; i < n; i++) {
            ans += arr[i];
        }
        return ans;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        int n = sc.nextInt();

        int[] arr = new int[n];
        for (int i = 0; i < n; i++) {
            arr[i] = sc.nextInt();
        }

        System.out.print(sum(n, arr));
        sc.close();
    }
}
