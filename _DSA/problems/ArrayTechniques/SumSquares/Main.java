import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] arr = new int[n];

        for (int i = 0; i < n; i++) {
            arr[i] = sc.nextInt();
        }

        int[] prefixSum = new int[n];
        prefixSum[0] = arr[0] * arr[0];
        for (int i = 1; i < n; i++) {
            prefixSum[i] = prefixSum[i - 1] + (arr[i] * arr[i]);
        }

        int q = sc.nextInt();
        for (int i = 0; i < q; i++) {
            int l = sc.nextInt();
            int r = sc.nextInt();
            l--;
            r--;
            int sum = 0;
            if (l == 0) {
                sum = prefixSum[r];
            } else {
                sum = prefixSum[r] - prefixSum[l - 1];
            }
            System.out.println(sum);
        }

        sc.close();
    }
}