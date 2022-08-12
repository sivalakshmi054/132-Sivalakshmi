create table paytm_reconciliation(
	transaction_id varchar(200),
    order_id varchar(200),
    tarsaction_date timestamp,
    status varchar(30),
    amount int(10),
    Payment_Mode  varchar(40),
    banktransaction_id varchar(200),
    response_message varchar(100)
)