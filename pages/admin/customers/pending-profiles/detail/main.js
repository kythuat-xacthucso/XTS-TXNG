(function () {
    // Sample profile data (replace with actual API data)
    const profile = {
        id: 1,
        legalName: "Công ty A",
        taxCode: "1234567890",
        representative: {
            name: "Nguyễn Văn A",
            phone: "0901234567",
            avatar: "https://via.placeholder.com/40"
        },
        contactInfo: {
            phone: "0901234567",
            email: "contact@a.com"
        },
        address: "123 Đường ABC, Quận 1, TP.HCM",
        submittedAt: "2025-07-01 10:00",
        approvedAt: null,
        status: "pending",
        attachments: [
            { name: "file1.pdf", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", type: "application/pdf" },
            { name: "file2.jpg", url: "https://via.placeholder.com/150", type: "image/jpeg" }
        ]
    };

    let currentLogoFile = null;

    // Initialize page
    function initialize() {
        const legalName = document.getElementById('legalName');
        const taxCode = document.getElementById('taxCode');
        const representativeName = document.getElementById('representativeName');
        const representativePhone = document.getElementById('representativePhone');
        const representativeAvatar = document.getElementById('representativeAvatar');
        const contactInfo = document.getElementById('contactInfo');
        const address = document.getElementById('address');
        const submittedAt = document.getElementById('submittedAt');
        const approvedAt = document.getElementById('approvedAt');
        const status = document.getElementById('status');
        const attachmentPreview = document.getElementById('attachmentPreview');
        const attachmentList = document.getElementById('attachmentList');
        const actionButtons = document.getElementById('actionButtons');

        if (legalName && taxCode && representativeName && representativePhone && representativeAvatar && contactInfo && address && submittedAt && approvedAt && status && attachmentPreview && attachmentList && actionButtons) {
            console.log('Initializing with profile data:', profile); // Debug log
            renderProfileDetails();
            renderActionButtons();
        } else {
            console.error('Required DOM elements not found.');
            let retryCount = 0;
            const maxRetries = 3;
            function retryInitialize() {
                if (retryCount < maxRetries) {
                    retryCount++;
                    console.log(`Retrying initialization... Attempt ${retryCount}/${maxRetries}`);
                    setTimeout(() => {
                        if (document.getElementById('legalName') && document.getElementById('taxCode') && 
                            document.getElementById('representativeName') && document.getElementById('representativePhone') && 
                            document.getElementById('representativeAvatar') && document.getElementById('contactInfo') && 
                            document.getElementById('address') && document.getElementById('submittedAt') && 
                            document.getElementById('approvedAt') && document.getElementById('status') && 
                            document.getElementById('attachmentPreview') && document.getElementById('attachmentList') && 
                            document.getElementById('actionButtons')) {
                            renderProfileDetails();
                            renderActionButtons();
                        } else {
                            retryInitialize();
                        }
                    }, 100);
                } else {
                    window.adminLayout.showNotification('Không thể tải giao diện chi tiết hồ sơ. Vui lòng thử lại.', 'danger');
                }
            }
            retryInitialize();
        }
    }

    // Render profile details
    function renderProfileDetails() {
        document.getElementById('legalName').textContent = profile.legalName;
        document.getElementById('taxCode').textContent = profile.taxCode;
        document.getElementById('representativeName').textContent = profile.representative.name;
        document.getElementById('representativePhone').textContent = profile.representative.phone;
        document.getElementById('representativeAvatar').src = profile.representative.avatar;
        document.getElementById('contactInfo').textContent = `${profile.contactInfo.phone} | ${profile.contactInfo.email}`;
        document.getElementById('address').textContent = profile.address;
        document.getElementById('submittedAt').textContent = profile.submittedAt;
        document.getElementById('approvedAt').textContent = profile.approvedAt || "Chưa duyệt";
        document.getElementById('status').textContent = getStatusText(profile.status);

        renderAttachments();
    }

    // Render attachments with preview
    function renderAttachments() {
        const previewContainer = document.getElementById('attachmentPreview');
        const listContainer = document.getElementById('attachmentList');
        previewContainer.innerHTML = '';
        listContainer.innerHTML = '';

        profile.attachments.forEach((attachment, index) => {
            // Preview
            if (attachment.type.startsWith('image/')) {
                const img = document.createElement('img');
                img.src = attachment.url;
                img.alt = attachment.name;
                img.onclick = () => previewAttachment(attachment.url, attachment.type);
                previewContainer.appendChild(img);
            } else if (attachment.type === 'application/pdf') {
                const pdfPreview = document.createElement('div');
                pdfPreview.className = 'pdf-preview';
                pdfPreview.innerHTML = '<i class="fas fa-file-pdf"></i> PDF';
                pdfPreview.onclick = () => previewAttachment(attachment.url, attachment.type);
                previewContainer.appendChild(pdfPreview);
            }

            // Link to view
            const link = document.createElement('a');
            link.href = attachment.url;
            link.target = '_blank';
            link.textContent = attachment.name;
            listContainer.appendChild(link);
            if (index < profile.attachments.length - 1) listContainer.appendChild(document.createTextNode(' | '));
        });
    }

    // Preview attachment in modal or new tab
    function previewAttachment(url, type) {
        if (type.startsWith('image/')) {
            window.open(url, '_blank');
        } else if (type === 'application/pdf') {
            const pdfModal = new bootstrap.Modal(document.getElementById('pdfPreviewModal'));
            document.getElementById('pdfPreviewIframe').src = url;
            pdfModal.show();
        }
    }

    // Get status text
    function getStatusText(status) {
        return status === 'pending' ? 'Chờ duyệt' :
               status === 'approved' ? 'Đã duyệt' :
               status === 'rejected' ? 'Từ chối' : 'Đã tạo chủ thể';
    }

    // Render action buttons based on status
    function renderActionButtons() {
        const buttonsContainer = document.getElementById('actionButtons');
        buttonsContainer.innerHTML = '';

        const backBtn = document.createElement('button');
        backBtn.className = 'btn btn-secondary';
        backBtn.innerHTML = '<i class="fas fa-arrow-left"></i> Quay lại';
        backBtn.onclick = goBack;
        buttonsContainer.appendChild(backBtn);

        if (profile.status === 'pending') {
            const approveBtn = document.createElement('button');
            approveBtn.className = 'btn btn-success ms-2';
            approveBtn.innerHTML = '<i class="fas fa-check"></i> Duyệt';
            approveBtn.onclick = showApproveConfirm;
            buttonsContainer.appendChild(approveBtn);

            const rejectBtn = document.createElement('button');
            rejectBtn.className = 'btn btn-danger ms-2';
            rejectBtn.innerHTML = '<i class="fas fa-times"></i> Từ chối';
            rejectBtn.onclick = showRejectConfirm;
            buttonsContainer.appendChild(rejectBtn);
        } else if (profile.status === 'approved') {
            const createEntityBtn = document.createElement('button');
            createEntityBtn.className = 'btn btn-primary ms-2';
            createEntityBtn.innerHTML = '<i class="fas fa-plus"></i> Tạo chủ thể';
            createEntityBtn.onclick = showCreateEntityModal;
            buttonsContainer.appendChild(createEntityBtn);
        } else if (profile.status === 'entity_created') {
            const viewEntityBtn = document.createElement('button');
            viewEntityBtn.className = 'btn btn-primary ms-2';
            viewEntityBtn.innerHTML = '<i class="fas fa-building"></i> Xem chi tiết chủ thể';
            viewEntityBtn.onclick = viewEntityDetails;
            buttonsContainer.appendChild(viewEntityBtn);
        }
    }

    // Go back to list
    function goBack() {
        window.adminLayout.loadContent('pending-profiles-list');
        history.pushState(null, '', '/pending-profiles-list');
    }

    // Show approve confirmation
    function showApproveConfirm() {
        const modal = new bootstrap.Modal(document.getElementById('confirmApproveModal'));
        document.getElementById('confirmApproveName').textContent = `Tên SPC: ${profile.legalName}`;

        const confirmButton = document.getElementById('confirmApproveButton');
        const confirmHandler = () => {
            profile.status = 'approved';
            profile.approvedAt = new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
            applyChanges();
            modal.hide();
            showToast(`Hồ sơ ${profile.legalName} đã được duyệt`, 'success');
            // Immediately show create entity modal
            showCreateEntityModal();
            confirmButton.removeEventListener('click', confirmHandler);
        };

        confirmButton.removeEventListener('click', confirmHandler);
        confirmButton.addEventListener('click', confirmHandler);

        modal.show();
    }

    // Show reject confirmation
    function showRejectConfirm() {
        const modal = new bootstrap.Modal(document.getElementById('confirmRejectModal'));
        document.getElementById('confirmRejectName').textContent = `Tên SPC: ${profile.legalName}`;

        const confirmButton = document.getElementById('confirmRejectButton');
        const confirmHandler = () => {
            const reason = document.getElementById('rejectionReason').value.trim();
            if (!reason) {
                showToast('Vui lòng nhập lý do xử lý', 'error');
                return;
            }
            profile.status = 'rejected';
            profile.approvedAt = new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
            profile.rejectionReason = reason;
            applyChanges();
            modal.hide();
            showToast(`Hồ sơ ${profile.legalName} đã bị từ chối`, 'success');
            confirmButton.removeEventListener('click', confirmHandler);
        };

        confirmButton.removeEventListener('click', confirmHandler);
        confirmButton.addEventListener('click', confirmHandler);

        modal.show();
    }

    // Show create entity modal
    function showCreateEntityModal() {
        const modal = new bootstrap.Modal(document.getElementById('createEntityModal'));
        document.getElementById('entitySpcName').value = profile.legalName;
        document.getElementById('entityTaxCode').value = profile.taxCode;
        document.getElementById('entityPhone').value = profile.contactInfo.phone;
        document.getElementById('entityEmail').value = profile.contactInfo.email;
        document.getElementById('entityAvatar').src = profile.representative.avatar;
        document.getElementById('entityRepresentativeName').textContent = profile.representative.name;
        document.getElementById('entityRepresentativePhone').textContent = profile.representative.phone;
        document.getElementById('entityAddress').value = profile.address;
        document.getElementById('entitySubmittedAt').value = profile.submittedAt;
        document.getElementById('entityFileLink').href = profile.attachments.find(a => a.type === 'application/pdf')?.url || '#';

        // Reset additional info fields
        document.getElementById('entitySlogan').value = '';
        document.getElementById('entityIntroduction').value = '';
        document.getElementById('entityOrgCode').value = '';
        document.getElementById('entityLogo').value = '';
        document.getElementById('logoPreview').classList.add('d-none');
        currentLogoFile = null;

        // Handle file preview click
        const fileLink = document.getElementById('entityFileLink');
        fileLink.onclick = (e) => {
            e.preventDefault();
            const pdfUrl = profile.attachments.find(a => a.type === 'application/pdf')?.url;
            if (pdfUrl) {
                const pdfModal = new bootstrap.Modal(document.getElementById('pdfPreviewModal'));
                document.getElementById('pdfPreviewIframe').src = pdfUrl;
                pdfModal.show();
            }
        };

        // Handle logo upload
        const logoInput = document.getElementById('entityLogo');
        logoInput.onchange = (e) => {
            const file = e.target.files[0];
            if (file && file.type.startsWith('image/')) {
                currentLogoFile = file;
                const reader = new FileReader();
                reader.onload = (event) => {
                    document.getElementById('logoImage').src = event.target.result;
                    document.getElementById('logoPreview').classList.remove('d-none');
                    logoInput.classList.add('d-none');
                };
                reader.readAsDataURL(file);
            } else {
                showToast('Vui lòng chọn file hình ảnh hợp lệ', 'error');
            }
        };

        // Handle logo removal
        const removeLogoButton = document.getElementById('removeLogoButton');
        removeLogoButton.onclick = () => {
            document.getElementById('entityLogo').value = '';
            document.getElementById('logoPreview').classList.add('d-none');
            logoInput.classList.remove('d-none');
            currentLogoFile = null;
        };

        // Handle create entity confirmation
        const confirmButton = document.getElementById('confirmCreateEntityButton');
        const confirmHandler = () => {
            const confirmModal = new bootstrap.Modal(document.getElementById('confirmCreateEntityModal'));
            document.getElementById('confirmCreateEntityName').innerHTML = `Tên SPC: ${profile.legalName}`;

            const finalCreateButton = document.getElementById('finalCreateEntityButton');
            const finalCreateHandler = () => {
                const slogan = document.getElementById('entitySlogan').value;
                const introduction = document.getElementById('entityIntroduction').value;
                const orgCode = document.getElementById('entityOrgCode').value;

                if (!orgCode) {
                    showToast('Vui lòng nhập mã tổ chức', 'error');
                    confirmModal.hide();
                    return;
                }

                profile.status = 'entity_created';
                profile.slogan = slogan;
                profile.introduction = introduction;
                profile.orgCode = orgCode;
                profile.logo = currentLogoFile ? URL.createObjectURL(currentLogoFile) : null;

                applyChanges();
                modal.hide();
                confirmModal.hide();
                showToast(`Chủ thể ${profile.legalName} đã được tạo`, 'success');
                finalCreateButton.removeEventListener('click', finalCreateHandler);
            };

            finalCreateButton.removeEventListener('click', finalCreateHandler);
            finalCreateButton.addEventListener('click', finalCreateHandler);

            confirmModal.show();
        };

        confirmButton.removeEventListener('click', confirmHandler);
        confirmButton.addEventListener('click', confirmHandler);

        modal.show();
    }

    // View entity details
    function viewEntityDetails() {
        window.adminLayout.loadContent('manage-entities-view');
        history.pushState(null, '', '/manage-entities-view?id=' + profile.id);
    }

    // Apply changes and re-render
    function applyChanges() {
        renderProfileDetails();
        renderActionButtons();
    }

    // Show toast notification
    function showToast(message, type = 'success') {
        const toastContainer = document.getElementById('toastContainer');
        if (!toastContainer) return;

        const toastId = `toast-${Date.now()}`;
        const toastHTML = `
            <div id="${toastId}" class="toast toast-${type}" role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="true" data-bs-delay="3000">
                <div class="toast-header">
                    <strong class="me-auto">Thông báo</strong>
                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body">${message}</div>
            </div>
        `;
        toastContainer.innerHTML += toastHTML;

        const toastElement = document.getElementById(toastId);
        const toast = new bootstrap.Toast(toastElement);
        toast.show();

        toastElement.addEventListener('hidden.bs.toast', () => toastElement.remove());
    }

    // Ensure initialization after content is loaded
    document.addEventListener('contentLoaded', (e) => {
        if (e.detail.contentId === 'pending-profiles-view') {
            console.log('contentLoaded event triggered for pending-profiles-view'); // Debug log
            initialize();
        }
    });

    // Fallback in case contentLoaded event is missed
    document.addEventListener('DOMContentLoaded', () => {
        if (window.location.pathname.includes('pending-profiles-view')) {
            console.log('DOMContentLoaded triggered, initializing...'); // Debug log
            initialize();
        } else if (document.getElementById('legalName') && document.getElementById('taxCode') && 
                   document.getElementById('representativeName') && document.getElementById('representativePhone') && 
                   document.getElementById('representativeAvatar') && document.getElementById('contactInfo') && 
                   document.getElementById('address') && document.getElementById('submittedAt') && 
                   document.getElementById('approvedAt') && document.getElementById('status') && 
                   document.getElementById('attachmentPreview') && document.getElementById('attachmentList') && 
                   document.getElementById('actionButtons')) {
            console.log('Manual initialization due to missing event'); // Debug log
            initialize();
        }
    });

    // Immediate initialization check (as a fallback)
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        console.log('Document ready, initializing immediately'); // Debug log
        initialize();
    }

    // Expose functions to global scope
    window.goBack = goBack;
    window.showApproveConfirm = showApproveConfirm;
    window.showRejectConfirm = showRejectConfirm;
    window.showCreateEntityModal = showCreateEntityModal;
    window.viewEntityDetails = viewEntityDetails;
})();