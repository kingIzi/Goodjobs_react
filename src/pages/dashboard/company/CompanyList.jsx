import React, { useState, useEffect } from 'react';
import parse from 'html-react-parser';
import CompanyForm from './CompanyForm';
import Modal from '@/widgets/Modal/Modal';
import LoadingIndicator from '@/widgets/loading/LoadingIndicator';
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Card,
    CardHeader,
    CardBody,
    Typography,
    IconButton,
    Spinner

  } from "@material-tailwind/react";
import useCompaniesStore from '@/store/companiesStore';



const CompanyList = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const companies = useCompaniesStore(state => state.companies);
  const dataLoading = useCompaniesStore(state => state.dataLoading);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
    <Dialog open={isModalOpen}  handler={toggleModal}>
    <DialogHeader>
        Add Company
      
      </DialogHeader>        <DialogBody>
        <CompanyForm closeModalAddCompany={isModalOpen} afterSubmit={toggleModal} setLoading={setIsLoading} />

        </DialogBody>
       
      </Dialog>

    <div>
    <div className="flex justify-end items-start">
  <div className="flex flex-row items-center justify-between w-full my-4">
    <Typography className="font-poppins text-2xl">
      Available companies
    </Typography>
    <Button className='bg-[#071460] hover:bg-[#180463]' onClick={() => setIsModalOpen(true)}>
      Add Company
    </Button>
  </div>
</div>
      {dataLoading ? (
        <LoadingIndicator />
      ) : (
        
        <Card>
      
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                  <div className="text-[11px] font-bold uppercase text-blue-gray-400">Company</div>
                </th>
                <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                  <div className="text-[11px] font-bold uppercase text-blue-gray-400">About</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company, key) => (
                <tr key={key}>
                  <td className="py-3 px-5">
                    <div className="flex items-center gap-4">
                      <img src={company.signed_url || 'default-image-url'} alt={company.name} className="w-10 h-10 rounded-full object-cover" />
                      <div>
                        <div className="font-semibold text-blue-gray">{company.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-5">
                  <div className="text-xs font-normal text-blue-gray-500 line-clamp-2">{parse(company.about_company)}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>
      
      )}

      {isModalOpen === true && (
        <Modal onClose={toggleModal}>
          <CompanyForm afterSubmit={toggleModal} setLoading={setIsLoading} />
        </Modal>
      )}
    </div>
    </>
  );
};

export default CompanyList;
