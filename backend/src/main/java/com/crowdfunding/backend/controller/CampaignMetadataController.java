package com.crowdfunding.backend.controller;

import com.crowdfunding.backend.entity.CampaignMetadata;
import com.crowdfunding.backend.repository.CampaignMetadataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/campaigns")
@CrossOrigin(origins = "*")
public class CampaignMetadataController {

    @Autowired
    private CampaignMetadataRepository campaignMetadataRepository;

    @PostMapping
    public ResponseEntity<CampaignMetadata> createMetadata(@RequestBody CampaignMetadata metadata) {
        return ResponseEntity.ok(campaignMetadataRepository.save(metadata));
    }

    @GetMapping
    public List<CampaignMetadata> getAllMetadata() {
        return campaignMetadataRepository.findAll();
    }

    @GetMapping("/{onChainId}")
    public ResponseEntity<CampaignMetadata> getMetadata(@PathVariable Long onChainId) {
        return campaignMetadataRepository.findByOnChainId(onChainId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
