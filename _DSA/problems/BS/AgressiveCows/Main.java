package problems.BS.AgressiveCows;

import java.util.*;

public class Main {

    public static boolean canPlace(long[] arr, int k, long dist) {
        long last = arr[0];
        int cnt = 1;

        for (int i = 1; i < arr.length; i++) {
            if (arr[i] - last >= dist) {
                cnt++;
                last = arr[i];
            }
        }

        return cnt >= k;
    }

    public static long bs(long[] arr, int k) {
        long low = 1;
        long high = arr[arr.length - 1] - arr[0];
        long ans = 0;

        while (low <= high) {
            long mid = low + (high - low) / 2;

            if (canPlace(arr, k, mid)) {
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
        int k = sc.nextInt();

        long[] arr = new long[n];
        for (int i = 0; i < n; i++) {
            arr[i] = sc.nextLong();
        }

        Arrays.sort(arr);

        System.out.println(bs(arr, k));

        sc.close();
    }
}