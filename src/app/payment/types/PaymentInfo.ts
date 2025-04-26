export type PaymentInfo = {
    SessionId: string;
    TransactionId: number;
    ReferenceId: string;
    Via: string;
    Channel: string;
    PaymentNo: string;
    QrString: string;
    PaymentName: string;
    SubTotal: number;
    Fee: number;
    Total: number;
    FeeDirection: string;
    Expired: string; // format datetime string
    QrImage: string;
    QrTemplate: string;
    Terminal: string;
    NNSCode: string | null;
    NMID: string;
    Note: string | null;
    Escrow: boolean;
};