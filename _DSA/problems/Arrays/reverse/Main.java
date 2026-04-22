package problems.Arrays.reverse;

import java.util.Scanner;

public class Main {
    public static void reverse(int i, int j, int[] arr) {
        while (i <= j) {
            int temp = arr[j];
            arr[j] = arr[i];
            arr[i] = temp;
            i++;
            j--;
        }
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();

        int[] arr = new int[n];
        for (int i = 0; i < n; i++) {
            arr[i] = sc.nextInt();
        }

        reverse(0, n - 1, arr);

        for (int i = 0; i < n; i++) {
            System.out.print(arr[i]);
            System.out.print(" ");
        }

        sc.close();
    }
}
