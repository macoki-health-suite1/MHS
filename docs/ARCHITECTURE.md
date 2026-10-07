# MaCoKi Health Suite — Restructured Architecture

## 1. Product foundation

MaCoKi Health Suite is a modular healthcare management platform.

The architecture is intended to support:

- Multiple healthcare organisations
- Multiple users and roles
- Multiple branches/facilities
- Patient management
- Clinical care
- Pharmacy
- Inventory
- Procurement
- Administration
- Reports
- Documents
- Health screening
- Future specialised modules

The goal is to make MaCoKi a product/platform, rather than a single-purpose application.

## 2. Main application modules

```
MaCoKi Health Suite
│
├── Dashboard
│
├── Clinical
│   ├── Patients
│   ├── Patient Registration
│   ├── Consultation
│   ├── Vitals
│   ├── Diagnoses
│   ├── Treatment
│   ├── Medical History
│   ├── Laboratory
│   ├── ANC / Maternal Care
│   └── Chronic Disease / Screening
│
├── Pharmacy
│   ├── Medicines
│   ├── Prescriptions
│   ├── Dispensing
│   └── Pharmacy Transactions
│
├── Inventory
│   ├── Stock
│   ├── Stock Movement
│   ├── Stock Adjustment
│   └── Low-stock Monitoring
│
├── Procurement
│   ├── Suppliers
│   ├── Purchase Orders
│   └── Goods Received
│
├── Administration
│   ├── Users
│   ├── Roles
│   ├── Facilities
│   └── Organisation Settings
│
├── Documents
│   ├── Patient Documents
│   ├── Reports
│   └── Generated Records
│
└── Reports
    ├── Clinical Reports
    ├── Pharmacy Reports
    ├── Inventory Reports
    └── Administrative Reports
```

> **Important:** The old school/education-oriented components are removed from the new architecture: School, Education, Learning/Library, CBT, Assessments, Learner/student functionality. They do not belong in the MaCoKi Health Suite core.

## 3. Existing CPS functionality

The existing work is not thrown away. The existing CPS clinical functionality becomes the foundation of MaCoKi Clinical.

```
OLD CPS
   ↓
MaCoKi Clinical
   ↓
MaCoKi Health Suite
```

The existing patient, ANC, laboratory and related clinical functionality is retained and reorganised rather than unnecessarily rebuilt from scratch.

## 4. Amarakings

Amarakings is a specialised reproductive-health component within the wider MaCoKi ecosystem.

```
MaCoKi Health Suite
│
├── MaCoKi Clinical
│   ├── Patient Management
│   ├── Clinical Records
│   ├── ANC
│   ├── Laboratory
│   └── Chronic Disease
│
└── Amarakings
    └── Women's/Reproductive Health
```

Amarakings does not need to be a completely separate software project. It operates as a specialised module/application inside the broader platform.

## 5. Frontend architecture

Technology direction: **React + TypeScript + Vite**

The frontend progressively moves toward this structure, so that everything is no longer placed in one enormous `App.tsx` as the system grows.

```
src/
│
├── App.tsx
├── main.tsx
│
├── components/
│
├── pages/
│   ├── Dashboard/
│   ├── Patients/
│   ├── Clinical/
│   ├── Pharmacy/
│   ├── Inventory/
│   ├── Procurement/
│   ├── Reports/
│   └── Settings/
│
├── modules/
│   ├── clinical/
│   ├── pharmacy/
│   ├── inventory/
│   ├── procurement/
│   └── amarakings/
│
├── services/
│   ├── api/
│   └── ...
│
├── storage/
│
├── types/
│
└── utils/
```

## 6. Backend architecture

Technology direction: **Django + Django REST Framework**

```
MaCoKi Frontend
      │
      │ REST API
      ↓
Django REST Framework
      │
      ├── Patients
      ├── Clinical
      ├── ANC
      ├── Laboratory
      ├── Pharmacy
      ├── Inventory
      ├── Procurement
      ├── Users
      ├── Organisations
      └── Reports
              │
              ↓
          PostgreSQL
```

The existing `/api` architecture remains the communication boundary between the frontend and backend.

## 7. Database architecture

For the commercial product, the system moves toward a proper relational database architecture, preferably **PostgreSQL**.

```
Organisation
      │
      ├── Facilities
      │
      ├── Users
      │
      ├── Patients
      │
      ├── Clinical Records
      │
      ├── Pharmacy
      │
      ├── Inventory
      │
      └── Reports
```

MaCoKi is intended to be multi-tenant. Each organisation's data must be properly isolated.

```
MaCoKi
│
├── Hospital A
│   ├── Staff
│   ├── Patients
│   ├── Pharmacy
│   └── Inventory
│
├── Clinic B
│   ├── Staff
│   ├── Patients
│   └── Pharmacy
│
└── Diagnostic Centre C
    ├── Staff
    ├── Patients
    └── Laboratory
```

## 8. Patient architecture

The intended patient flow:

```
Patient Registration Form
          ↓
Frontend validation
          ↓
API request
          ↓
Django REST API
          ↓
Patient database record
          ↓
API response
          ↓
Frontend state/cache
          ↓
Patients List
```

This addresses a known issue in the old CPS project: a patient could apparently be saved, but the patient's name did not appear in the Patients list. The restructuring fixes the underlying data flow rather than simply patching the display.

## 9. Storage architecture

The old localStorage approach must not remain the authoritative source for a commercial healthcare system.

```
PostgreSQL
   ↑
Django REST API
   ↑
React frontend
   ↓
Optional local/offline cache
```

- **Database = authoritative source**
- **Local storage/cache = supporting mechanism**

This is more appropriate for a system deployed across multiple facilities and users.

## 10. Commercial architecture

MaCoKi is designed so that eventually it serves many organisations, not just one clinic.

```
                   MaCoKi Health Suite
                           │
        ┌──────────────────┼──────────────────┐
        ↓                  ↓                  ↓
     Hospital           Clinic          Diagnostic Centre
        │                  │                  │
     Users              Users              Users
        │                  │                  │
     Patients           Patients           Patients
```

The architecture therefore needs:

- Organisation/tenant management
- User accounts
- Role-based permissions
- Auditability
- Secure patient data
- Database relationships
- API authentication
- Scalable reporting
- Modular feature activation

## 11. Chronic disease / diabetes functionality

Diabetes prevention/screening work fits into MaCoKi without making diabetes the entire identity of the product.

```
MaCoKi Clinical
      │
      └── Health Screening
              │
              ├── Diabetes Risk
              ├── Hypertension
              ├── Lifestyle Risk
              └── Other Screening Modules
```

This allows existing expertise to become a commercial clinical module rather than limiting MaCoKi to one disease.

## 12. Final architecture

```
                    ┌─────────────────────────┐
                    │   MaCoKi Health Suite   │
                    └────────────┬────────────┘
                                 │
             ┌───────────────────┼───────────────────┐
             │                   │                   │
             ↓                   ↓                   ↓
       MaCoKi Clinical      Pharmacy            Inventory
             │                   │                   │
             ├── Patients        ├── Medicines       ├── Stock
             ├── Consultation    ├── Prescriptions   ├── Movements
             ├── Vitals          └── Dispensing      └── Alerts
             ├── ANC
             ├── Laboratory
             ├── Screening
             └── Chronic Care
             
             ┌───────────────────┼───────────────────┐
             │                   │                   │
             ↓                   ↓                   ↓
       Procurement          Administration        Reports
             │                   │                   │
          Suppliers          Users/Roles        Analytics
          Purchasing         Facilities         Exports
             
                         │
                         ↓
                    Amarakings
                 Reproductive Health
                         
                         │
                         ↓
                 Django REST API
                         │
                         ↓
                    PostgreSQL
```

## Technology stack

| Layer | Technology |
|---|---|
| Frontend | React + TypeScript + Vite |
| Backend | Django + Django REST Framework |
| Database | PostgreSQL |
| API | REST |
| Authentication | Role-based/user authentication |
| Mobile direction | Capacitor/Android |
| Architecture | Modular + multi-tenant |
| Storage principle | Backend database authoritative |
