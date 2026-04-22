package problems.BS.FirstandLastOccurence;

import java.util.Scanner;

public class Main {
    public static int firstOccurence(int[] arr, int x) {
        int low = 0;
        int high = arr.length - 1;
        int ans = -1;
        while (low <= high) {
            int mid = (low + high) / 2;
            if (arr[mid] == x) {
                ans = mid;
                high = mid - 1;
            } else if (arr[mid] > x) {
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
        return ans;
    }

    public static int lastOccurence(int[] arr, int x) {
        int low = 0;
        int high = arr.length - 1;
        int ans = -1;
        while (low <= high) {
            int mid = (low + high) / 2;
            if (arr[mid] == x) {
                ans = mid;
                low = mid + 1;
            } else if (arr[mid] > x) {
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
        int q = sc.nextInt();

        int[] arr = new int[n];
        for (int i = 0; i < n; i++) {
            arr[i] = sc.nextInt();
        }

        for (int i = 0; i < q; i++) {
            int x = sc.nextInt();
            int first = (firstOccurence(arr, x) == -1) ? -1 : firstOccurence(arr, x) + 1;
            int last = (lastOccurence(arr, x) == -1) ? -1 : lastOccurence(arr, x) + 1;
            if (first == -1 || last == -1) {
                System.out.println(-1);
            } else {

                System.out.println(first + " " + last);
            }
        }

        sc.close();
    }
}
