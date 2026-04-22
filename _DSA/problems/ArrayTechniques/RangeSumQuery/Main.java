import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        int n = sc.nextInt();
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) {
            arr[i] = sc.nextInt();
        }

        int[] prefixArray = new int[n];
        prefixArray[0] = arr[0];
        for (int i = 1; i < n; i++) {
            prefixArray[i] = prefixArray[i - 1] + arr[i];
        }
        int q = sc.nextInt();
        for (int i = 0; i < q; i++) {
            int l = sc.nextInt();
            int r = sc.nextInt();
            l--;
            r--;
            int sum = 0;
            if (l == 0) {
                sum = prefixArray[r];
            } else {
                sum = prefixArray[r] - prefixArray[l - 1];
            }
            System.out.println(sum);
        }

        sc.close();
    }
}
