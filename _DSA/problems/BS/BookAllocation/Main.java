package problems.BS.BookAllocation;

import java.util.Scanner;

public class Main {
    public static long findMax(int[] arr, int n) {
        long ans = arr[0];
        for (int i = 0; i < n; i++) {
            if (arr[i] > ans) {
                ans = arr[i];
            }
        }
        return ans;
    }

    public static long findSum(int[] arr, int n) {
        long sum = 0;
        for (int i = 0; i < n; i++) {
            sum += arr[i];
        }
        return sum;
    }

    public static int countStudents(int[] arr, long pages, int n) {
        int st = 1;
        long currentPages = 0;
        for (int i = 0; i < n; i++) {
            if (currentPages + arr[i] <= pages) {
                currentPages += arr[i];
            } else {
                st++;
                currentPages = arr[i];
            }
        }
        return st;
    }

    public static long ls(int[] arr, int n, int s) {
        long min = findMax(arr, n);
        long max = findSum(arr, n);

        for (long pages = min; pages < max; pages++) {
            int cnt = countStudents(arr, pages, n);
            if (cnt == s) {
                return pages;
            }
        }

        return -1;
    }

    public static long bs(int[] arr, int n, int s) {
        long low = findMax(arr, n);
        long high = findSum(arr, n);
        long ans = -1;
        while (low <= high) {
            long mid = (low + high) / 2;
            if (countStudents(arr, mid, n) <= s) {
                ans = mid;
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
        return ans;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int s = sc.nextInt();

        int[] arr = new int[n];
        for (int i = 0; i < n; i++) {
            arr[i] = sc.nextInt();
        }

        if (s > n) {
            System.out.println(-1);
        } else {
            System.out.println(bs(arr, n, s));
        }

        sc.close();
    }
}
