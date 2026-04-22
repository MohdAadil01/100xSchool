package problems.BS.FreqXY;

import java.util.Arrays;
import java.util.Scanner;

public class Main {
    public static int firstOccurence(int[] arr, int x) {
        // first element greater than or equal to x;
        int ans = -1;
        int low = 0;
        int high = arr.length - 1;
        while (low <= high) {
            int mid = (low + high) / 2;
            if (arr[mid] >= x) {
                ans = mid;
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }

        return ans;
    }

    public static int lastOccurence(int[] arr, int y) {
        // last element lasser than or equal to y
        int ans = -1;
        int low = 0;
        int high = arr.length - 1;
        while (low <= high) {
            int mid = (low + high) / 2;
            if (arr[mid] <= y) {
                ans = mid;
                low = mid + 1;
            } else {
                high = mid - 1;
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

        Arrays.sort(arr);

        for (int i = 0; i < q; i++) {
            int x = sc.nextInt();
            int y = sc.nextInt();

            int first = firstOccurence(arr, x);
            int last = lastOccurence(arr, y);
            if (first == -1 || last == -1) {
                System.out.println(0);
            } else if (y < x) {
                System.out.println(0);
            } else {
                int ans = last - first + 1;
                System.out.println(ans);
            }
        }
        sc.close();
    }
}
