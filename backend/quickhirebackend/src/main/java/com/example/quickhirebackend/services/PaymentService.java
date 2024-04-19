package com.example.quickhirebackend.services;

import com.example.quickhirebackend.dao.PaymentRepository;
import com.example.quickhirebackend.model.Payments;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class PaymentService {
  private  final PaymentRepository paymentRepository;


    public PaymentService(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }

    public Payments createPayment(Payments payment) {
        return paymentRepository.save(payment);
    }

    public List<Payments> getAllPayments() {
        return paymentRepository.findAll();
    }

    public Optional<Payments> getPaymentById(Integer paymentId) {
        return paymentRepository.findById(paymentId);
    }

    public Payments updatePayment(Integer paymentId, Payments paymentDetails) {
        return paymentRepository.findById(paymentId).map(existingPayment -> {
            existingPayment.setStatus(paymentDetails.getStatus());
            existingPayment.setStartDate(paymentDetails.getStartDate());
            existingPayment.setEndDate(paymentDetails.getEndDate());
            existingPayment.setAmount(paymentDetails.getAmount());
            existingPayment.setProfId(paymentDetails.getProfId());
            return paymentRepository.save(existingPayment);
        }).orElseGet(() -> {

            return paymentRepository.save(paymentDetails);
        });
    }

    public void deletePayment(Integer paymentId) {
        paymentRepository.deleteById(paymentId);
    }


    public Double balanceChecker(Integer profid){
//        Double sum= paymentRepository.sumAmountByProfid(profid);
//        if(sum==null){
//            return 0.0;
//        }
        return  0.0;
    }

}
