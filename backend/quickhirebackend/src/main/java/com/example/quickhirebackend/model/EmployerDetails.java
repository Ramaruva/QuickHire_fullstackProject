package com.example.quickhirebackend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "employerdetails")
public class EmployerDetails {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Integer employerid; // Corresponds to the "employerid" column which is auto-incremented
        private String companyname; // Corresponds to the "companyname" column
        private int profid; // Corresponds to the "profid" column which seems like a foreign key

        // Getters and setters
        public Integer getEmployerId() {
            return employerid;
        }

        public void setEmployerId(int employerId) {
            this.employerid = employerId;
        }

        public String getCompanyName() {
            return companyname;
        }

        public void setCompanyName(String companyName) {
            this.companyname = companyName;
        }

        public Integer getProfId() {
            return profid;
        }

        public void setProfId(Integer profId) {
            this.profid = profId;
        }

        // toString for debugging
        @Override
        public String toString() {
            return "Employment{" +
                    "employerId=" + employerid +
                    ", companyName='" + companyname + '\'' +
                    ", profId=" + profid +
                    '}';
        }
    }
